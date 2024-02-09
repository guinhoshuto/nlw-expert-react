import * as Dialog from "@radix-ui/react-dialog"
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from "date-fns/locale"
import { X } from "lucide-react"

interface NoteCardProps {
    id: number,
    date: Date,
    content: string,
    onNoteDeleted: (id: number) => void
}

export function NoteCard({ date, content, id, onNoteDeleted}: NoteCardProps){
    return(
        <Dialog.Root>
            <Dialog.Trigger className='rounded-md text-left bg-slate-800 p-5 flex flex-col gap-3 overflow-hidden relative outline-none hover:ring-2 ring-slate-600 focus-visible:ring-lime-400'>
                <span className='text-sm font-medium text-slate-300'>{formatDistanceToNow(date, { locale: ptBR, addSuffix: true })}</span>
                <p className='text-sm leading-6 text-slate-400'>
                    {content}
                </p>
                <div className='absolute bottom-0 right-0 left-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none'></div>
                <Dialog.Portal>
                    <Dialog.Overlay className="inset-0 fixed bg-black/60" />
                    <Dialog.Content className="fixed h-[60vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full bg-slate-700 rounded-md flex flex-col outline-none overflow-hidden">
                        <Dialog.Close className="absolute right-2 top-2 text-slate-400">
                            <X className="size-5"/>
                        </Dialog.Close>
                        <div className="flex flex-1 flex-col gap-3 p-5">
                            <span className='text-sm font-medium text-slate-300'>{formatDistanceToNow(date, { locale: ptBR, addSuffix: true })}</span>
                            <p className='text-sm leading-6 text-slate-400'>
                                {content}
                            </p>
                        </div>
                        <button 
                            type="button" 
                            onClick={() => onNoteDeleted(id)}
                            className="w-full bg-slate-800 font-medium py-4 text-center text-sm text-slate-300 outline-none group"
                        >
                            Deseja <span className="text-red-400 group-hover:underline"> apagar essa nota</span>?
                        </button>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Trigger>
        </Dialog.Root>
    )
}