from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import SubscriptionPlan, Subscription
from django.utils import timezone

from .serializers import SubscriptionPlanSerializer, SubscriptionSerializer
# Create your views here.

class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Subscription.objects.filter(user=self.request.user)
    
    ## subscribe to a plan
    @action(detail=False, methods=['post'])
    def subscribe(self, request):
        plan_id = request.data.get('plan_id')
        plan = SubscriptionPlan.objects.get(id=plan_id)
        
        ## check if u r already subscribed 
        try:
            current_subscription = Subscription.objects.get(user=request.user, is_active=True)
            # If switching to the same plan, do nothing
            if current_subscription.plan == plan:
                return Response({'message': 'You are already subscribed to this plan'}, status=status.HTTP_200_OK)
            
            # If switching to a new plan
            action = 'switch'
        except Subscription.DoesNotExist:
            # New subscription
            action = 'new'
            
        ## now u have a plan ID you can implement paypal payment !
        
        
        
        
        
        
        
        
    ## cancel your subscription 
    @action(detail=False, methods=['post'])
    def cancel(self, request):
        try:
            subscription = Subscription.objects.get(user=request.user, is_active=True)
            subscription.is_active = False
            subscription.end_date = timezone.now()
            subscription.save()
            return Response({'status': 'Subscription cancelled'})
        except Subscription.DoesNotExist:
            return Response({'error': 'No active subscription found'}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['get'])
    def current(self, request):
        try:
            subscription = Subscription.objects.get(user=request.user, is_active=True)
            serializer = self.get_serializer(subscription)
            return Response(serializer.data)
        except Subscription.DoesNotExist:
            return Response({"detail": "No  subscription found"}, status=status.HTTP_404_NOT_FOUND)

class SubscriptionPlanViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SubscriptionPlan.objects.all()
    serializer_class = SubscriptionPlanSerializer
    permission_classes = [IsAuthenticated]