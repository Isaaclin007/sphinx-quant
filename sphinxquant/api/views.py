from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from .models import StrategyCode, Backtest, Strategy
from .serializers import StrategyCodeSerializer, BacktestSerializer, StrategySerializer

class StrategyCodeView(APIView):
    """根据code查询代码"""
    def get(self, request, format=None):
        code_id  = self.request.query_params.get('id', None)
        code = StrategyCode.objects.get(id=code_id)
        serializer = StrategyCodeSerializer(code)
        return Response(serializer.data)

# Create your views here.
class StrategyListView(ListAPIView):
    """ Strategy View """
    queryset = Strategy.objects.all()
    serializer_class = StrategySerializer

class StrategyView(APIView):
    def get(self, request, format=None):
        user = Strategy.objects.get(id=id)
        serializer = StrategySerializer()
        return Response(serializer.data)

class BacktestListView(ListAPIView):
    """ Backtest View """
    queryset = Backtest.objects.all()
    serializer_class = BacktestSerializer
