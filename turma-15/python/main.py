from binance.client import Client

# Substitua por suas credenciais da API da Binance
api_key = 'SUA_API_KEY'
api_secret = 'SEU_API_SECRET'

# Inicializa o cliente da Binance
client = Client(api_key, api_secret)

# Defina a quantidade e o símbolo (por exemplo, 'BTCUSDT')
symbol = 'BTCUSDT'
quantity = 0.001  # Quantidade de BTC que você deseja comprar

# Realiza a ordem de compra de mercado
try:
    order = client.order_market_buy(
        symbol=symbol,
        quantity=quantity
    )
    print("Ordem de compra realizada:", order)
except Exception as e:
    print("Erro ao realizar a ordem de compra:", e)
