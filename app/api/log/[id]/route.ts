import { authOptions } from '@/lib/auth';
import { prisma } from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = (await params).id;

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response('Session not found', {
        status: 401,
      });
    }

    const log = await prisma.log.findUnique({
      where: {
        id,
      },
      include: {
        project: true,
      },
    });

    return NextResponse.json({ log });
  } catch (error) {
    console.error(error);
    return new Response('Failed to get log', { status: 500 });
  }
};

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = (await params).id;

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response('Session not found', {
        status: 401,
      });
    }

    const data = await req.json();

    const res = await prisma.log.update({
      where: {
        id: id,
      },
      data,
      include: {
        project: true,
      },
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to update log:' + id, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = (await params).id;

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response('Session not found', {
        status: 401,
      });
    }

    const res = await prisma.log.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to delete log:' + id, { status: 500 });
  }
}
