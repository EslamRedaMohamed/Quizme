from rest_framework import routers

from attempts.views import AttemptViewSet

router = routers.DefaultRouter()
router.register(r'attempts', AttemptViewSet, basename='attempt')
urlpatterns = router.urls
