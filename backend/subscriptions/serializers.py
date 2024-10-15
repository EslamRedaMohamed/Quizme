from rest_framework import serializers
from .models import SubscriptionPlan, Subscription

class subscriptionPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = ['id', 'name', 'exam_limit', 'price']
        

class SubscriptionSerializer(serializers.ModelSerializer):
    plan = subscriptionPlanSerializer(read_only=True)

    class Meta:
        model = Subscription
        fields = ['id', 'user', 'plan', 'start_date', 'end_date', 'is_active']
        read_only_fields = ['user', 'start_date']
    

