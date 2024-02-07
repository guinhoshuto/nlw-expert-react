import logo from './assets/logo-black.svg'

export function App() { 

  return (
    <div className="mx-auto max-w-6xl space-y-6 my-12">
      <img src={logo} alt="nlw expert" />
      <form className='w-full'>
        <input 
          className='w-full bg-transparent font-semibold tracking-tight placeholder:text-slate-500 outline-none text-3xl border-b-1 border-white'
          type="text" 
          placeholder='Busque em suas notas...'/>
      </form>
      <div className='h-px bg-slate-700'></div>
      <div className='grid grid-cols-3 auto-rows-[250px] gap-6'>
        <div className='rounded-md bg-slate-700 p-5 space-y-3'>
          <span className='text-sm font-medium text-slate-200'>Adicionar nota</span>
          <p className='text-sm leading-6 text-slate-400'>Grave uma nota em áudio que será convertida para texto automaticamente.</p>
        </div>

        <div className='rounded-md bg-slate-800 p-5 space-y-3'>
          <span className='text-sm font-medium text-slate-200'>Adicionar nota</span>
          <p className='text-sm leading-6 text-slate-400'>Grave uma nota em áudio que será convertida para texto automaticamente.</p>
        </div>
        
        <div className='rounded-md bg-slate-800 p-5 space-y-3'>
          <span className='text-sm font-medium text-slate-200'>Adicionar nota</span>
          <p className='text-sm leading-6 text-slate-400'>Grave uma nota em áudio que será convertida para texto automaticamente.</p>
        </div>

        <div className='rounded-md bg-slate-700'>
        </div>

        <div className='rounded-md bg-slate-700'>
        </div>

        <div className='rounded-md bg-slate-700'>
        </div>
      </div>
    </div>
  )
}
