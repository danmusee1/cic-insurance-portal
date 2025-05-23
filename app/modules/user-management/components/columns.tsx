'use client'



import { MoreHorizontal, ArrowUpDown } from 'lucide-react'

import { Button } from 'components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from 'components/ui/dropdown-menu'
import type { ColumnDef } from '@tanstack/react-table'

export type User = {
  no: number
  id: string
  firstName:string,
  lastName:string,
  role:string,
  name:string
  emaiL: string
  createdAt:Date
  isAdmin:boolean
  profile: { name: string }[];

}


export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'no',
    header: ({ column }) => {
      return (
        <Button
        className=''
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          #
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
        className=''
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
        className=''
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },

  
  /* {
    accessorKey: 'email',
    header: 'Email'
  }, */
 /*  {
    accessorKey: 'profileName',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ProfileName
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  }, */
  {
    accessorKey: 'createdAt',
    header: 'Date Joined',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'))
      const formatted = date.toLocaleDateString()
      return <div className='font-medium'>{formatted}</div>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only '>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='bg-white'>
            <DropdownMenuLabel className='text-black'>Actions</DropdownMenuLabel>
            <DropdownMenuItem className='text-black cursor-pointer'
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Update User
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-black cursor-pointer'>Block User</DropdownMenuItem>
            <DropdownMenuItem className='text-black cursor-pointer'>View User details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
