import { authOptions } from '@/lib/auth';
import { prisma } from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response('Session not found', {
        status: 401,
      });
    }

    const searchParams = req.nextUrl.searchParams;

    const dateParam = searchParams.get('date');
    const date = dateParam
      ? isNaN(new Date(dateParam).getTime())
        ? null
        : dateParam
      : undefined;
    const projectId = searchParams.get('projectId');

    if (date) {
      const projects = await prisma.project.findMany({
        where: { userId: session.user.id, status: 'in-progress' },
        orderBy: [{ createdAt: 'asc' }],
      });

      const logs = [];
      for (const project of projects) {
        const data = await prisma.log.findMany({
          where: {
            userId: session.user.id,
            projectId: project.id,
            date,
          },
          include: { project: true },
          orderBy: [{ updatedAt: 'asc' }],
        });

        if (data.length < 1) {
          const newLog = await prisma.log.create({
            data: {
              date,
              projectId: project.id,
              userId: session.user.id,
              count: 0,
              goal: project.defaultGoal,
            },
            include: { project: true },
          });
          logs.push(newLog);
        } else if (data.length > 1) {
          logs.push(data[0]);
          for (const item of data.slice(1, data.length)) {
            await prisma.log.delete({
              where: {
                id: item.id,
              },
            });
          }
        } else {
          logs.push(data[0]);
        }
      }

      return new Response(JSON.stringify(logs), { status: 200 });
    } else if (projectId) {
      const data = await prisma.log.findMany({
        where: {
          userId: session.user.id,
          projectId,
        },
        include: { project: true },
        orderBy: [{ updatedAt: 'asc' }],
      });

      return new Response(JSON.stringify(data), { status: 200 });
    } else {
      return new Response(
        'Fail to get goal logs: Date parameter is required and must be a valid date',
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch goalLogs', { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response('Session not found', {
      status: 401,
    });
  }

  const reqData = await req.json();
  try {
    // Check if exists and delete
    const prevDataList = await prisma.log.findMany({
      where: {
        userId: session.user.id,
        date: reqData.date,
        projectId: reqData.projectId,
      },
      include: { project: true },
      orderBy: [{ createdAt: 'asc' }],
    });

    if (prevDataList.length > 1) {
      for (const deleteData of prevDataList) {
        await prisma.project.delete({
          where: {
            id: deleteData.id,
          },
        });
      }
    }

    // Create data
    const data = await prisma.log.create({
      data: {
        ...reqData,
        userId: session.user.id,
      },
      include: { project: true },
    });

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to create goalLog', { status: 500 });
  }
}
