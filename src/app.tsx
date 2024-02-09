import { ChangeEvent, useState } from 'react'
import logo from './assets/logo-black.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

interface Notes {
  id: number,
  date: Date,
  content: string
}

export function App() { 
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Notes[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')
    if(notesOnStorage) return JSON.parse(notesOnStorage)
    return []
  })

  function handleSearch(event: ChangeEvent<HTMLInputElement>){
    const query = event.target.value
    setSearch(query)
  }

  function onNoteCreated(content: string){
    const newNote = {
      id: Math.max.apply(null, notes.map(note => note.id)) + 1,
      date: new Date(),
      content
    }

    const notesArray = [newNote, ...notes]
    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function onNoteDeleted(id: number){
    const notesArray = notes.filter(note => {
      return note.id != id
    })

    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  const filteredNotes = search != '' 
    ? notes.filter(note => note.content.toLowerCase().includes(search.toLowerCase()))
    : notes

  return (
    <div className="mx-auto max-w-6xl space-y-6 my-12 px-5 md:px-0">
      <img src={logo} alt="nlw expert" />
      <form className='w-full'>
        <input 
          className='w-full bg-transparent font-semibold tracking-tight placeholder:text-slate-500 outline-none text-3xl border-b-1 border-white'
          onChange={handleSearch}
          type="text" 
          placeholder='Busque em suas notas...'/>
      </form>
      <div className='h-px bg-slate-700'></div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6'>
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {filteredNotes.map(note => (
          <NoteCard onNoteDeleted={onNoteDeleted} key={note.id} id={note.id} date={note.date} content={note.content} />
        ))}
        
      </div>
    </div>
  )
}
