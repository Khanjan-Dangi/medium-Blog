import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { updateBlogInput, createBlogInput } from '@kd21/medium-common'

const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string
    },
    Variables: {
      userID: string
    }
  }>()

blogRouter.use("/*", async (c,next) =>  {

    const header = c.req.header("authorization") || "";
  
    const token = header.split(" ")[1];
  
    const response = await verify(token,c.env.JWT_SECRET);
  
    if(response.id){
      c.set("userID",response.id);
      await next();
    }else{
      c.status(403);
      return c.json({error: "Unauthorized"});
    }
  })
  
blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();

    const { success } = createBlogInput.safeParse(body);
    
    if(!success){
      c.status(411);
      return c.json({error: "Wrong Inputs!"});
    }

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: c.get("userID")
    }
  })

  return c.json({
    id: blog.id
  })
})
  
blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();

  const { success } = updateBlogInput.safeParse(body);
    
    if(!success){
      c.status(411);
      return c.json({error: "Wrong Inputs!"});
    }

  const blog = await prisma.post.update({
    where: {
      id: body.id
    },
    data: {
      title: body.title,
      content: body.content,
    }
  })

  return c.json({
    id: blog.id
  })
})

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blogs = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          name: true
        }
      }
    }
  });

  return c.json({
    blogs
  })
})
  
blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = c.req.param("id");

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: body
      },select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true
          }
        }
      }
    })
  
    return c.json({
      blog
    })
  } catch (error) {
    c.status(403);
    return c.json({error: "Blog ID does not exists!"})
  }
})
  
export default blogRouter;