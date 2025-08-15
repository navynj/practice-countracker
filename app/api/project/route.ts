import { authOptions } from '@/lib/auth';
import { prisma } from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response('Session not found', {
      status: 401,
    });
  }

  const searchParams = req.nextUrl.searchParams;
  const status = searchParams.get('status') || undefined;

  try {
    const data = await prisma.project.findMany({
      where: { userId: session.user.id, status },
      orderBy: [{ createdAt: 'asc' }],
    });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch categories', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response('Session not found', {
      status: 401,
    });
  }

  const reqData = await req.json();

  const searchParams = req.nextUrl.searchParams;
  const date = searchParams.get('date') || undefined;

  try {
    const data = await prisma.project.create({
      data: {
        ...reqData,
        userId: session.user.id,
      },
    });

    if (date) {
      await prisma.log.create({
        data: {
          projectId: data.id,
          goal: data.defaultGoal,
          count: 0,
          date,
          userId: session.user.id,
        },
      });
    }

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to create project', { status: 500 });
  }
}
