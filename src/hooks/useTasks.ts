import { DragEvent, useState } from "react";
import { useTaskStore } from "../stores";
import Swal from "sweetalert2";
import { TaskStatus } from "../interfaces";

interface Options {
    status: TaskStatus,
}

export const useTasks = ({ status }: Options) => {
    const isDragging = useTaskStore(state => !!state.draggingTaskId)
    const onTaskDrop = useTaskStore(state => state.onTaskDrop)
    const addTask = useTaskStore(state => state.addTask)

    const [onDraggOver, setOnDraggOver] = useState(false)

    const handleAddTask = async() => {
        const { isConfirmed, value } = await Swal.fire({
        title: 'Nueva Tarea',
        input: 'text',
        inputLabel: 'Nombre de la tarea',
        inputPlaceholder: 'Ingresa el nombre de la tarea',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value){
            return 'Debe de ingresar un nombre para la tarea'
            }
        }
        });

        if (!isConfirmed) return;
        
        addTask(value, status)
    }

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setOnDraggOver(true)
    }

    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setOnDraggOver(false)
    }

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setOnDraggOver(false)
        onTaskDrop(status)
    }

    return {
        //Properties
        isDragging,

        // Methods
        onDraggOver,
        handleAddTask,
        handleDragOver,
        handleDragLeave,
        handleDrop,
    }
}