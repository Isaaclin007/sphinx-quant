from .models import StrategyCode, Backtest, Strategy
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer


class StrategyCodeSerializer(ModelSerializer):
    """策略代码Serializer"""

    class Meta:
        model = StrategyCode
        fields = '__all__'


class SimpleBacktestSerializer(ModelSerializer):
    """简易回测试Serializer"""
    strategy_code = StrategyCodeSerializer()

    class Meta:
        model = Backtest
        fields = (
            'name',
            'description',
            'start_date',
            'end_date',
            'status',
            'bar_type',
            'total_profit_percent',
            'year_profit_percent',
            'max_dropdown_percent',
            'created_at',
            'updated_at',
        )


class BacktestSerializer(ModelSerializer):
    """回测Serializer"""
    strategy_code = StrategyCodeSerializer()

    class Meta:
        model = Backtest
        fields = '__all__'


class StrategySerializer(ModelSerializer):
    """策略Serializer"""
    strategy_code = StrategyCodeSerializer()

    bt_length = serializers.SerializerMethodField('get_backtest_length')

    def get_backtest_length(self, obj):
        return len(Backtest.objects.filter(strategy=obj.id))

    class Meta:
        model = Strategy
        fields = '__all__'