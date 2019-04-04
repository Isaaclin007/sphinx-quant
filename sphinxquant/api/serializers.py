from .models import StrategyCode, Backtest, Strategy
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer


class StrategyCodeSerializer(ModelSerializer):
    """策略代码Serializer"""

    class Meta:
        model = StrategyCode
        fields = '__all__'


class BacktestSerializer(ModelSerializer):
    """回测Serializer"""
    strategy_code = StrategyCodeSerializer()

    class Meta:
        model = Backtest
        fields = '__all__'


class StrategySerializer(ModelSerializer):
    """策略Serializer"""
    bt_length = serializers.SerializerMethodField('get_backtest_length')

    def get_backtest_length(self, obj):
        return len(Backtest.objects.filter(strategy=obj.id))

    class Meta:
        model = Strategy
        fields = '__all__'