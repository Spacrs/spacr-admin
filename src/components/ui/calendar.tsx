// 'use client'

// import * as React from 'react'
// import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
// import { DayPicker } from 'react-day-picker'

// import { cn } from '../../lib/utils'
// import { buttonVariants } from './button'

// export type CalendarProps = React.ComponentProps<typeof DayPicker>

// function Calendar ({
//   className,
//   classNames,
//   showOutsideDays = true,
//   ...props
// }: CalendarProps): JSX.Element {
//   return (
//     <DayPicker
//       showOutsideDays={showOutsideDays}
//       className={cn('p-3', className)}
//       // classNames={{
//       //   // months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
//       //   months: 'flex gap-4',
//       //   month: 'space-y-4',
//       //   // caption: 'flex justify-center pt-1 relative items-center',
//       //   caption: 'flex justify-center pt-1 relative items-center',
//       //   caption_label: 'text-sm font-medium',
//       //   nav: 'space-x-1 flex items-center',
//       //   nav_button: cn(
//       //     buttonVariants({ variant: 'outline' }),
//       //     'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
//       //   ),
//       //   nav_button_previous: 'absolute left-1',
//       //   nav_button_next: 'absolute right-1',
//       //   // table: 'w-full border-collapse space-y-1',
//       //   table: 'w-full border-collapse',

//       //   // head_row: 'flex',
//       //   // head_row: 'grid grid-cols-7',
//       //   // head_cell:
//       //   //   'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
//       //   // head_cell: 'text-center text-muted-foreground font-normal text-[0.8rem]',
//       //   // row: 'flex w-full mt-2 rounded-lg overflow-hidden',
//       //   // row: 'grid grid-cols-7 mt-2',

//       //   head_row: 'flex w-full',
//       //   head_cell: 'w-10 text-center text-muted-foreground text-[0.8rem]',
//       //   row: 'flex w-full mt-2',
//       //   cell: 'w-10 h-10 text-center p-0 relative',

//       //   // cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
//       //   // cell: 'text-center text-sm p-0 relative',
//       //   // day: cn(
//       //   //   buttonVariants({ variant: 'ghost' }),
//       //   //   'h-8 w-8 p-0 font-normal aria-selected:opacity-100'
//       //   // ),
//       //   day: cn(
//       //     buttonVariants({ variant: 'ghost' }),
//       //     'h-9 w-9 p-0 font-normal'
//       //   ),
//       //   day_selected:
//       //     'bg-indigo-500 hover:bg-indigo-500 focus:bg-indigo-500 text-white rounded-md',
//       //   day_today: 'bg-accent text-accent-foreground',
//       //   day_outside: 'text-muted-foreground opacity-40 invisible',
//       //   day_disabled: 'text-muted-foreground opacity-40',
//       //   day_range_middle:
//       //     'aria-selected:bg-indigo-100 aria-selected:text-indigo-800 rounded-none',
//       //   day_hidden: 'invisible',
//       //   ...classNames
//       // }}

//       // classNames={{
//       //   months: 'flex gap-4',
//       //   month: 'space-y-4',

//       //   caption: 'flex justify-center items-center relative',
//       //   caption_label: 'text-sm font-medium',

//       //   nav: 'flex items-center gap-1',
//       //   button_previous: 'absolute left-1',
//       //   button_next: 'absolute right-1',

//       //   table: 'w-full border-collapse',

//       //   weekdays: 'flex',
//       //   weekday: 'w-10 text-center text-muted-foreground text-xs',

//       //   week: 'flex w-full mt-2',
//       //   day: 'w-10 h-10 flex items-center justify-center text-sm',

//       //   day_selected: 'bg-indigo-500 text-white rounded-md',
//       //   day_today: 'bg-accent text-accent-foreground',
//       //   day_outside: 'opacity-40 invisible',
//       // }}

//       // classNames={{
//       //   months: 'flex gap-4',
//       //   month: 'space-y-4',

//       //   caption: 'flex justify-center items-center relative',
//       //   caption_label: 'text-sm font-medium',

//       //   nav: 'flex items-center gap-1',
//       //   button_previous: 'absolute left-1',
//       //   button_next: 'absolute right-1',

//       //   table: 'w-full border-collapse',

//       //   weekdays: 'flex w-full',
//       //   weekday:
//       //     'w-10 text-center text-muted-foreground text-xs font-normal',

//       //   week: 'flex w-full mt-2',

//       //   day: cn(
//       //     buttonVariants({ variant: 'ghost' }),
//       //     'w-10 h-10 flex items-center justify-center p-0 font-normal'
//       //   ),

//       //   day_selected:
//       //     'bg-indigo-500 text-white hover:bg-indigo-500 focus:bg-indigo-500',

//       //   day_today: 'bg-accent text-accent-foreground',

//       //   day_outside: 'opacity-40 invisible',
//       // }}

//       classNames={{
//         months: 'flex gap-4',
//         month: 'space-y-4',

//         caption: 'flex justify-center items-center relative pt-6',  // ← top space de diya
//         caption_label: 'text-sm font-bold',

//         nav: 'flex items-center justify-between w-96 absolute top-0 left-0 right-0',  // ← first month ke liye hi
//         nav_button_previous: 'h-6 w-6 p-0 opacity-70 hover:opacity-100',
//         nav_button_next: 'h-6 w-6 p-0 opacity-70 hover:opacity-100',

//         table: 'w-full border-collapse',

//         weekdays: 'flex w-full',
//         weekday: 'w-10 text-center text-muted-foreground text-xs font-normal',

//         week: 'flex w-full mt-2',

//         day: cn(
//           buttonVariants({ variant: 'ghost' }),
//           'w-10 h-10 flex items-center justify-center p-0 font-normal'
//         ),

//         day_selected: 'bg-indigo-500 text-white hover:bg-indigo-500 focus:bg-indigo-500',

//         day_today: 'bg-accent text-accent-foreground',

//         day_outside: 'opacity-40 invisible',
//       }}
//       components={{
//         Chevron: ({ orientation }) =>
//           orientation === 'left' ? (
//             <ChevronLeftIcon className="h-4 w-4" />
//           ) : (
//             <ChevronRightIcon className="h-4 w-4" />
//           ),
//       }}
//       {...props}
//     />
//   )
// }
// Calendar.displayName = 'Calendar'

// export { Calendar }


// 'use client'

// import * as React from 'react'
// import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
// import { DayPicker } from 'react-day-picker'

// import { cn } from '../../lib/utils'
// import { buttonVariants } from './button'

// export type CalendarProps = React.ComponentProps<typeof DayPicker>

// function Calendar ({
//   className,
//   classNames,
//   showOutsideDays = true,
//   ...props
// }: CalendarProps): JSX.Element {
//   return (
//     <DayPicker
//       showOutsideDays={showOutsideDays}
//       className={cn('p-3', className)}
//       // classNames={{
//       //   months: 'flex gap-6',
//       //   month: 'space-y-4',

//       //   caption: 'flex justify-center items-center relative mb-4',
//       //   caption_label: 'text-sm font-bold',

//       //   nav: 'flex items-center justify-between absolute top-0 left-0 right-0 w-full px-4',
//       //   nav_button: cn(
//       //     buttonVariants({ variant: 'outline' }),
//       //     'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
//       //   ),
//       //   nav_button_previous: 'absolute left-0',
//       //   nav_button_next: 'absolute right-0',

//       //   table: 'w-full border-collapse',

//       //   weekdays: 'flex w-full',
//       //   weekday: 'w-10 text-center text-muted-foreground text-xs font-normal',

//       //   week: 'flex w-full mt-2',

//       //   day: cn(
//       //     buttonVariants({ variant: 'ghost' }),
//       //     'w-10 h-10 flex items-center justify-center p-0 font-normal'
//       //   ),

//       //   day_selected: 'bg-indigo-500 text-white hover:bg-indigo-500 focus:bg-indigo-500 rounded-md',

//       //   day_today: 'bg-accent text-accent-foreground',

//       //   day_outside: 'opacity-40 invisible',

//       //   day_range_middle: 'aria-selected:bg-indigo-100 aria-selected:text-indigo-800 rounded-none',
//       // }}

//       classNames={{
//         months: 'flex gap-6',
//         month: 'space-y-4',

//         caption: 'flex justify-center items-center relative mb-4 h-8',  // ← fixed height
//         caption_label: 'text-sm font-bold',

//         nav: 'flex items-center justify-between w-full',  // ← absolute hataya
//         nav_button: cn(
//           buttonVariants({ variant: 'outline' }),
//           'h-6 w-6 bg-transparent p-0 opacity-60 hover:opacity-100'
//         ),
//         nav_button_previous: '',
//         nav_button_next: '',

//         table: 'w-full border-collapse',

//         weekdays: 'flex w-full',
//         weekday: 'w-10 text-center text-muted-foreground text-xs font-normal',

//         week: 'flex w-full mt-2',

//         day: cn(
//           buttonVariants({ variant: 'ghost' }),
//           'w-10 h-10 flex items-center justify-center p-0 font-normal'
//         ),

//         day_selected: 'bg-indigo-500 text-white hover:bg-indigo-500 focus:bg-indigo-500 rounded-md',

//         day_today: 'bg-accent text-accent-foreground',

//         day_outside: 'opacity-40 invisible',

//         day_range_middle: 'aria-selected:bg-indigo-100 aria-selected:text-indigo-800 rounded-none',
//       }}
//       components={{
//         Chevron: ({ orientation }) =>
//           orientation === 'left' ? (
//             <ChevronLeftIcon className="h-4 w-4" />
//           ) : (
//             <ChevronRightIcon className="h-4 w-4" />
//           ),
//       }}
//       {...props}
//     />
//   )
// }
// Calendar.displayName = 'Calendar'

// export { Calendar }


'use client'

import * as React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { DayPicker, useDayPicker } from 'react-day-picker'
import { cn } from '../../lib/utils'
import { buttonVariants } from './button'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

// Custom Nav — left arrow sirf pehle month pe, right arrow sirf doosre pe
function CustomNav() {
  const { nextMonth, previousMonth, goToMonth } = useDayPicker()

  return (
    <>
      <button
        onClick={() => previousMonth && goToMonth(previousMonth)}
        disabled={!previousMonth}
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'absolute left-2 top-1 h-7 w-7 p-0 opacity-60 hover:opacity-100 z-10'
        )}
        aria-label="Previous month"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>
      <button
        onClick={() => nextMonth && goToMonth(nextMonth)}
        disabled={!nextMonth}
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'absolute right-2 top-1 h-7 w-7 p-0 opacity-60 hover:opacity-100 z-10'
        )}
        aria-label="Next month"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </>
  )
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps): JSX.Element {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3 relative', className)}
      classNames={{
        months: 'flex gap-5 justify-center items-center',
        month: 'space-y-4',

        caption: 'flex justify-center items-center h-8 mb-2',
        caption_label: 'text-sm font-bold',

        // nav hide kar do — custom nav use karenge
        nav: 'hidden',

        table: 'w-full border-collapse',

        weekdays: 'flex w-full',
        weekday: 'w-10 text-center text-muted-foreground text-xs font-normal',

        week: 'flex w-full mt-2',

        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'w-10 h-10 flex items-center justify-center p-0 font-normal'
        ),

        day_selected:
          'bg-indigo-500 text-white hover:bg-indigo-500 focus:bg-indigo-500 rounded-md',

        day_today: 'bg-accent text-accent-foreground',

        day_outside: 'opacity-40 invisible',

        day_range_middle:
          'aria-selected:bg-indigo-100 aria-selected:text-indigo-800 rounded-none',

        ...classNames,
      }}
      components={{
        Nav: CustomNav,  // ← custom nav use karo
      }}
      {...props}
    />
  )
}

Calendar.displayName = 'Calendar'

export { Calendar }