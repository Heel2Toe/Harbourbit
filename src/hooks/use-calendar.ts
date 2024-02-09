import { create } from "zustand";

interface CalendarProps {
    date: number,
    month: number,
    year: number,
    dates: number[]
}

interface SetCalendarProps extends CalendarProps {
    setCalendar: (props:Partial<CalendarProps>) => void
}

const date = new Date();

export const useCalendar = create<SetCalendarProps>((set)=> ({
    date: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    dates: [],
    setCalendar: (props) => set((prev)=> ({...prev, ...props}))
}))