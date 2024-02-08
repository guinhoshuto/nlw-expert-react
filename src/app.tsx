import logo from './assets/logo-black.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

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
        <NewNoteCard />
        <NoteCard date={new Date()} content='Grave uma nota em áudio que será convertida para texto automaticamente.Grave uma nota em áudio que será convertida para texto automaticamente.Grave uma nota em áudio que será convertida para texto automaticamente.Grave uma nota em áudio que será convertida para texto automaticamente.'/>
        
      </div>
    </div>
  )
}
