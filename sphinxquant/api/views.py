from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from .models import StrategyCode, Backtest, Strategy
from .serializers import StrategyCodeSerializer, SimpleBacktestSerializer, BacktestSerializer, StrategySerializer


# Create your views here.
class StrategyView(ListCreateAPIView):
    """ Strategy View """
    queryset = Strategy.objects.all()
    serializer_class = StrategySerializer

class BacktestView(ListCreateAPIView):
    """ Backtest View """
    queryset = Backtest.objects.all()
    serializer_class = BacktestSerializer
