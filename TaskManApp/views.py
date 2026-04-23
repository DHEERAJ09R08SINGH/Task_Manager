from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken

from .models import Task


from .serializers import RegisterSerializer, TaskSerializer


# Register
from drf_yasg.utils import swagger_auto_schema

@swagger_auto_schema(method='post', request_body=RegisterSerializer)
@api_view(['POST'])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


# Login
from drf_yasg.utils import swagger_auto_schema
from .serializers import LoginSerializer

@swagger_auto_schema(method='post', request_body=LoginSerializer)
@api_view(['POST'])
def login_view(request):
    user = authenticate(
        username=request.data.get("username"),
        password=request.data.get("password")
    )

    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "role": user.role
        })

    return Response({"error": "Invalid credentials"}, status=400)


from .permissions import IsAdmin

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def admin_dashboard(request):
    return Response({
        "message": "Welcome Admin",
        "total_tasks": Task.objects.count()
    })


# List + Create
from drf_yasg.utils import swagger_auto_schema
from .serializers import TaskSerializer

@swagger_auto_schema(method='post', request_body=TaskSerializer)
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def task_list_create(request):

    if request.method == 'GET':
        tasks = Task.objects.filter(user=request.user)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = TaskSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)


# Detail + Update + Delete
from drf_yasg.utils import swagger_auto_schema
from .serializers import TaskSerializer

@swagger_auto_schema(method='get')
@swagger_auto_schema(method='put', request_body=TaskSerializer)
@swagger_auto_schema(method='patch', request_body=TaskSerializer)
@swagger_auto_schema(method='delete')
@api_view(['GET', 'PUT', 'PATCH', 'DELETE']) 
@permission_classes([IsAuthenticated])
def task_detail(request, pk):

    try:
        task = Task.objects.get(pk=pk, user=request.user)
    except Task.DoesNotExist:
        return Response({"error": "Not found"}, status=404)

    if request.method == 'GET':
        return Response(TaskSerializer(task).data)

    elif request.method == 'PUT':
        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


    elif request.method == 'PATCH':
        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        task.delete()
        return Response({"message": "Deleted"}, status=204)
