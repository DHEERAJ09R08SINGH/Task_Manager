from django.urls import path
from .views import register_view, login_view, task_list_create, task_detail, admin_dashboard

urlpatterns = [
    path('register/', register_view),
    path('login/', login_view),

    path('tasks/', task_list_create),
    path('tasks/<int:pk>/', task_detail),
    path('admin-dashboard/', admin_dashboard),

]