import { authOptions } from '@/lib/auth';
import { prisma } from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response('Session not found', {
        status: 401,
      });
    }

    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    return NextResponse.json({ project });
  } catch (error) {
    console.error(error);
    return new Response('Failed to get project', { status: 500 });
  }
};

export async function PATCH(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response('Session not found', {
        status: 401,
      });
    }

    const data = await req.json();

    const res = await prisma.project.update({
      where: {
        id: id,
      },
      data,
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to update project:' + id, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response('Session not found', {
        status: 401,
      });
    }

    const res = await prisma.project.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to delete project:' + id, { status: 500 });
  }
}
