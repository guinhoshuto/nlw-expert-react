import * as Dialog from '@radix-ui/react-dialog'
import { X } from "lucide-react"
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewNoteCardProps {
    onNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
    const [shouldShowOnboarding, setShouldShowOnboarding] = useState<Boolean>(true)
    const [content, setContent] = useState('')
    const [isRecording, setIsRecording] = useState(false)

    function handleShouldShowOnboarding(){
        setShouldShowOnboarding(false)
    }

    function handleChanged(event: ChangeEvent<HTMLTextAreaElement>){
        setContent(event.target.value)
        if(event.target.value === "") setShouldShowOnboarding(true)
    }

    function handleSaveNote(event: FormEvent){
        event.preventDefault()

        if(content==="") return

        onNoteCreated(content)
        setContent('')
        toast.success('Nota criada com sucesso')
    }

    function handleStartRecording(){
        const isSpeechRecognitionAPIAvailable = "SpeechRecognition" in window || "webkitSpeechRecognition" in window
        if(!isSpeechRecognitionAPIAvailable) {
            alert("Infelizmente seu navegador não suporta a API de gravação")
            return
        }

        setIsRecording(true)
        setShouldShowOnboarding(false)

        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
        
        speechRecognition = new SpeechRecognitionAPI()
        speechRecognition.lang = 'pt-BR'
        speechRecognition.continuous = true
        speechRecognition.maxAlternatives = 1
        speechRecognition.interimResults = true

        speechRecognition.onresult = (event) => {
            const transcription = Array.from(event.results).reduce((text, result) => {
                return text.concat(result[0].transcript)
            }, '')

            setContent(transcription)
        }

        speechRecognition.onerror = (event) => {
            console.error(event)
        }

        speechRecognition.start()
    }

    function handleStopRecording(){
        setIsRecording(false)
        if(speechRecognition != null) {
            speechRecognition.stop()
        }
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
                    <Dialog.Content className="fixed inset-0 md:h-[60vh] md:inset-auto *:md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 max-w-[640px] w-full bg-slate-700 rounded-md flex flex-col outline-none overflow-hidden">
                        <Dialog.Close className="absolute right-2 top-2 text-slate-400">
                            <X className="size-5"/>
                        </Dialog.Close>
                        <form className='flex-1 flex flex-col'>
                            <div className="flex flex-1 flex-col gap-3 p-5">
                                <span className='text-sm font-medium text-slate-300'>
                                    Adicionar nota
                                </span>
                                {shouldShowOnboarding ? (
                                    <p className='text-sm leading-6 text-slate-400'>
                                        Comece{` `}
                                        <button type="button" onClick={handleStartRecording} className='font-medium text-lime-400 hover:underline'>gravando uma nota</button>{` `}
                                        em áudio ou se preferir{` `} 
                                        <button type="button" onClick={handleShouldShowOnboarding} className='font-medium text-lime-400 hover:underline'>utilize apenas texto</button>
                                    </p>
                                ) : (
                                    <textarea 
                                        autoFocus
                                        className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
                                        onChange={handleChanged}
                                        value={content}
                                    />
                                )}
                            </div>
                            {isRecording ? (
                                <button 
                                    type="button" 
                                    onClick={handleStopRecording}
                                    className="w-full flex items-center justify-center gap-2 cursor-pointer bg-slate-900 font-medium py-4 text-center text-sm text-lime-400 outline-none hover:bg-slate-100"
                                >
                                    <div className='size-3 rounded-full bg-red-500 animate-pulse'></div>
                                    Gravando! (clique p/ interromper)
                                </button>
                            ) : (
                                <button 
                                    type='submit'
                                    onClick={handleSaveNote}
                                    className="w-full cursor-pointer bg-lime-400 font-medium py-4 text-center text-sm text-lime-950 outline-none hover:bg-lime-500"
                                >
                                    Salvar nota
                                </button>
                            )}
                        </form>
                    </Dialog.Content>
                </Dialog.Portal>

            </Dialog.Trigger>
        </Dialog.Root>
    )
}