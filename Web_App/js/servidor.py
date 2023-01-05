import socket

# Cria o objeto socket
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Vincula o socket à porta
server_socket.bind(('', 5500))

# Começa a escutar as conexões entrantes
server_socket.listen()

# Aceita uma conexão
client_socket, client_address = server_socket.accept()

# Envia uma mensagem de volta para o cliente
client_socket.send(b"Connected success.")

# Fecha a conexão com o cliente
client_socket.close()