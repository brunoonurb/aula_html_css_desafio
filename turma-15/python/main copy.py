import requests
import time
import hmac
import hashlib

# Substitua com sua API Key e Secret da Binance
api_key = 'SUA_API_KEY'
api_secret = 'SEU_API_SECRET'

# URL base da API Binance
base_url = 'https://api.binance.com'

# Endpoint para fazer uma ordem
endpoint = '/api/v3/order'

# Defina os parâmetros da ordem
params = {
    'symbol': 'BTCUSDT',  # Par de negociação
    'side': 'BUY',        # Compra
    'type': 'MARKET',     # Tipo de ordem: Mercado
    'quantity': 0.001,    # Quantidade que você deseja comprar
    'timestamp': int(time.time() * 1000)  # Timestamp atual em milissegundos
}

# Função para gerar a assinatura da requisição
def sign_params(secret, params):
    query_string = '&'.join([f"{key}={value}" for key, value in params.items()])
    signature = hmac.new(secret.encode('utf-8'), query_string.encode('utf-8'), hashlib.sha256).hexdigest()
    return signature

# Gerando a assinatura
params['signature'] = sign_params(api_secret, params)

# Cabeçalhos da requisição
headers = {
    'X-MBX-APIKEY': api_key
}

# Fazendo a requisição POST para a API Binance
response = requests.post(base_url + endpoint, params=params, headers=headers)

# Exibindo a resposta
if response.status_code == 200:
    print("Ordem de compra realizada:", response.json())
else:
    print("Erro ao realizar a ordem:", response.json())