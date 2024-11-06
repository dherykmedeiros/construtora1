const apiUrl = 'http://localhost:3000/usuarios';

// Função para obter todos os usuários
async function getUsuarios() {
  try {
    const response = await fetch(apiUrl);
    const usuarios = await response.json();
    const usuariosList = document.getElementById('usuariosList');
    usuariosList.innerHTML = '';
    usuarios.forEach(usuario => {
      const listItem = document.createElement('li');
      listItem.textContent = `ID: ${usuario.id}, Nome: ${usuario.nome}, Email: ${usuario.email}, Nome de Usuário: ${usuario.nome_usuario}, CPF: ${usuario.cpf}, Função: ${usuario.funcao}`;
      usuariosList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
  }
}

// Função para criar um novo usuário
async function createUsuario() {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const nome_usuario = document.getElementById('nome_usuario').value;
  const senha = document.getElementById('senha').value;
  const cpf = document.getElementById('cpf').value;
  const funcao = document.getElementById('funcao').value;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome,
        email,
        nome_usuario,
        senha,
        cpf,
        funcao
      })
    });

    if (response.ok) {
      alert('Usuário criado com sucesso!');
      document.getElementById('usuarioForm').reset();
      getUsuarios();
    } else {
      const errorData = await response.json();
      alert(`Erro ao criar usuário: ${errorData.message}`);
    }
  } catch (error) {
    alert(`Erro na requisição: ${error.message}`);
  }
}

// Função para atualizar um usuário
async function updateUsuario() {
  const id = document.getElementById('editId').value;
  const nome = document.getElementById('editNome').value;
  const email = document.getElementById('editEmail').value;
  const nome_usuario = document.getElementById('editNomeUsuario').value;
  const senha = document.getElementById('editSenha').value;
  const cpf = document.getElementById('editCpf').value;
  const funcao = document.getElementById('editFuncao').value;

  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome,
        email,
        nome_usuario,
        senha,
        cpf,
        funcao
      })
    });

    if (response.ok) {
      alert('Usuário atualizado com sucesso!');
      document.getElementById('editarUsuarioForm').reset();
      getUsuarios();
    } else {
      const errorData = await response.json();
      alert(`Erro ao atualizar usuário: ${errorData.message}`);
    }
  } catch (error) {
    alert(`Erro na requisição: ${error.message}`);
  }
}

// Função para deletar um usuário
async function deleteUsuario() {
  const id = document.getElementById('deleteId').value;

  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      alert('Usuário deletado com sucesso!');
      document.getElementById('deleteId').value = '';
      getUsuarios();
    } else {
      const errorData = await response.json();
      alert(`Erro ao deletar usuário: ${errorData.message}`);
    }
  } catch (error) {
    alert(`Erro na requisição: ${error.message}`);
  }
}
