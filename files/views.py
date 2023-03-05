from .serializers import FileSerializer
from .models import File
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from django.http import FileResponse
from rest_framework.decorators import action
from django.db.models import Count, F
# Create your views here.

class FileView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        files = File.objects.all()
        serializer = FileSerializer(files, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        files_serializer = FileSerializer(data=request.data)
        if files_serializer.is_valid():
            files_serializer.save()
            return Response(files_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(files_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class FilesView(viewsets.ModelViewSet):
    queryset = File.objects.all()

    def list(self, request, *args, **kwargs):
        queryset= self.get_queryset()
        query_params = request.query_params
        username = query_params.get('username', None)

        if username:
            queryset = queryset.filter(uploaded_by__username = username)

        serializer = FileSerializer(queryset, many=True)
        return Response(serializer.data)

    
    def create(self, request, *args, **kwargs):
        user = request.user.id if request.user and not(request.user.is_anonymous) else 1
        data = request.data
        file = data.get('document', None)
        data['uploaded_by'] = user
        data['document_type'] = file.name.split('.')[-1] if file and file.name else ''
        data['description'] = file.name

        files_serializer = FileSerializer(data=data)
        if files_serializer.is_valid():
            files_serializer.save()
            return Response(files_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(files_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        file_handle = instance.document.open()

        # send file
        response = FileResponse(file_handle, content_type='whatever')
        response['Content-Length'] = instance.document.size
        response['Content-Disposition'] = 'attachment; filename="%s"' % instance.document.name

        return response
    
    @action(detail=False, methods=['GET'], name='user_count')
    def user_level_count(self, request, *args, **kwargs):
        all_queryset = self.get_queryset()
        queryset = all_queryset.annotate(user=F('uploaded_by__username')).values('user').annotate(count=Count('id'))

        queryset = list(queryset)

        queryset.append({'user': 'All', 'count': all_queryset.count()})
        return Response(queryset)
    
    @action(detail=False, methods=['GET'], name='file_count')
    def file_level_count(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        query_params = request.query_params

        username = query_params.get('username', None)

        if username and username !=  'All':
            queryset = queryset.filter(uploaded_by__username = username)

        queryset = queryset.values('document_type').annotate(count=Count('id'))

        return Response(queryset)
    

