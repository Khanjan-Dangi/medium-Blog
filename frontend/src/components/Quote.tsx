
const Quote = () => {
  return (
    <div className='h-screen bg-slate-100 flex items-center justify-center'>
        <div className='max-w-lg'>
            <div className='text-2xl font-bold'>"{q}"</div>
            <div className='text-xl font-semibold mt-4'>Jules Winnfield</div>
            <div className='text-sm font-medium text-slate-500'>CEO, Acme Inc.</div>
        </div>
    </div>
  )
}

export default Quote

const q = "The customer service I received was exceptional. The support team went above and beyond to address my concerns.";
