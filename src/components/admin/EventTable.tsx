// components/EventTable.tsx
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IEvent } from '@/models/Events';
import Link from 'next/link';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Calendar, Clock, Star, Users } from 'lucide-react';
import { format } from 'date-fns';

export default function EventTable({ events }: { events: IEvent[] }) {
  return (
    <div className="rounded-lg border shadow-sm overflow-hidden">
      <Table className="min-w-[800px]">
        <TableHeader className="bg-royal-50">
          <TableRow>
            <TableHead className="w-[300px] text-royal-800">Event</TableHead>
            <TableHead className="text-royal-800">Date & Time</TableHead>
            <TableHead className="text-royal-800">Category</TableHead>
            <TableHead className="text-royal-800">RSVPs</TableHead>
            <TableHead className="text-royal-800">Status</TableHead>
            <TableHead className="text-right text-royal-800">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id} className="hover:bg-royal-50/50">
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium line-clamp-1">{event.title}</p>
                    <p className="text-sm text-gray-500">{event.branch}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-royal-600" />
                  <span>
                    {format(new Date(event.date), 'MMM dd, yyyy')}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-4 w-4 text-royal-600" />
                  <span className="text-sm text-gray-500">{event.time}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    event.category === 'spiritual'
                      ? 'bg-faith-100 text-faith-800 border-faith-200'
                      : event.category === 'academic'
                      ? 'bg-primary-100 text-primary-800 border-primary-200'
                      : event.category === 'career'
                      ? 'bg-gold-100 text-gold-800 border-gold-200'
                      : 'bg-royal-100 text-royal-800 border-royal-200'
                  }
                >
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-royal-600" />
                  <span>{event.rsvps}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      new Date(event.date) > new Date() ? 'default' : 'secondary'
                    }
                    className={
                      new Date(event.date) > new Date()
                        ? 'bg-green-100 text-green-800 hover:bg-green-100'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                    }
                  >
                    {new Date(event.date) > new Date() ? 'Upcoming' : 'Past'}
                  </Badge>
                  {event.featured && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Star className="h-4 w-4 text-gold-600 fill-gold-300" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Featured Event</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/events/${event.id}`}>Edit</Link>
                  </Button>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}