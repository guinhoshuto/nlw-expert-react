import * as Dialog from '@radix-ui/react-dialog'
import { X } from "lucide-react"
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from 'react'
import { toast } from 'sonner'

export function NewNoteCard() {
    const [shouldShowOnboarding, setShouldShowOnboarding] = useState<Boolean>(true)
    const [content, setContent] = useState('')

    function handleShouldShowOnboarding(){
        setShouldShowOnboarding(false)
    }

    function handleChanged(event: ChangeEvent<HTMLTextAreaElement>){
        setContent(event.target.value)
        if(event.target.value === "") setShouldShowOnboarding(true)
    }

    function handleSaveNote(event: FormEvent){
        event.preventDefault()
        toast.success('Nota criada com sucesso')
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger className='rounded-md flex flex-col text-left bg-slate-700 p-5 space-y-3 overflow-hidden'>
                <span className='text-sm font-medium text-slate-200'>Adicionar nota</span>
                <p className='text-sm leading-6 text-slate-400'>
                    Grave uma nota em áudio que será convertida para texto automaticamente.
                </p>
                <Dialog.Portal>
                    <Dialog.Overlay className="inset-0 fixed bg-black/60" />
                    <Dialog.Content className="fixed h-[60vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full bg-slate-700 rounded-md flex flex-col outline-none overflow-hidden">
                        <Dialog.Close className="absolute right-2 top-2 text-slate-400">
                            <X className="size-5"/>
                        </Dialog.Close>
                        <form onSubmit={handleSaveNote} className='flex-1 flex flex-col'>
                            <div className="flex flex-1 flex-col gap-3 p-5">
                                <span className='text-sm font-medium text-slate-300'>
                                    Adicionar nota
                                </span>
                                {shouldShowOnboarding ? (
                                    <p className='text-sm leading-6 text-slate-400'>
                                        Comece{` `}
                                        <button onClick={() => {}} className='font-medium text-lime-400 hover:underline'>gravando uma nota</button> 
                                        em áudio ou se preferir{` `} 
                                        <button onClick={handleShouldShowOnboarding} className='font-medium text-lime-400 hover:underline'>utilize apenas texto</button>
                                    </p>
                                ) : (
                                    <textarea 
                                        autoFocus
                                        className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
                                        onChange={handleChanged}
                                    />
                                )}
                            </div>
                            <button 
                                type="button" 
                                onClick={handleSaveNote}
                                className="w-full cursor-pointer bg-lime-400 font-medium py-4 text-center text-sm text-lime-950 outline-none hover:bg-lime-500"
                            >
                                Salvar nota
                            </button>
                        </form>
                    </Dialog.Content>
                </Dialog.Portal>

            </Dialog.Trigger>
        </Dialog.Root>
    )
}