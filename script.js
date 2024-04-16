// Obtenha o modal
var modal = document.getElementById("myModal");

// Obtenha o elemento <span> que fecha o modal
var span = document.getElementsByClassName("close")[0];

// Quando o usuário clicar no <span> (x), feche o modal
span.onclick = function () {
  modal.style.display = "none";
};

// Quando o usuário clicar em qualquer lugar fora do modal, feche-o
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Função para carregar e exibir o conteúdo do arquivo de texto
async function loadFileContent(fileAnotacoes) {
  try {
    const response = await fetch(`${fileAnotacoes}`);
    console.log(response.ok);
    if (!response.ok) {
      return null;
    }
    return response.text();
  } catch (error) {
    return null;
  }
}

async function montarTags(fileTags) {
  const tags = await loadFileContent(fileTags);
  if (!tags) {
    return;
  }

  const stylesArray = tags.split("\n");

  const tableBody = document.querySelector("#styles-table tbody");
  tableBody.innerHTML = "";

  const addedProperties = {};

stylesArray.forEach((style) => {
    if (style) {
        const [property, value] = style.split(":").map((s) => s.trim()); // Separa a propriedade e o valor
        // Verifica se a propriedade já foi adicionada
        if (!addedProperties[property]) {
            addedProperties[property] = true; // Marca a propriedade como adicionada
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${property != undefined ? property: '' }</td>
                <td>${value!= undefined ? value: ''}</td>
                <td>${style!= undefined ? style: ''}</td>
            `;
            tableBody.appendChild(row);
        }
    }
});
}

async function montarObs(fileTags) {
  const obs = await loadFileContent(fileTags);
  console.log(obs);
  // return;
  if (!obs) {
    return;
  }

  

  const divObs = document.querySelector("#observacoes");

  divObs.innerHTML = "";
// Cria um elemento <pre> para manter a formatação
const preElement = document.createElement("pre");

// Define o conteúdo da string de estilo dentro do elemento <pre>
preElement.textContent = obs;

// Adiciona o elemento <pre> à div
divObs.appendChild(preElement);
}
async function montarModal(fileTags, fileObs) {
  await montarTags(fileTags);
  await montarObs(fileObs);
  // MONTA TABELA DE LINK
}
function abrirModal(fileTags, fileObs) {
  montarModal(fileTags, fileObs);
  modal.style.display = "block";
}


// Função para copiar o conteúdo do elemento <pre> para a área de transferência
function copyPreContent() {
  const preElement = document.querySelector("#observacoes pre");
  const range = document.createRange();
  range.selectNode(preElement);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);

  try {
      document.execCommand("copy");
      showTooltip();
      console.log("Conteúdo copiado para a área de transferência.");
  } catch (err) {
      console.error("Falha ao copiar o conteúdo:", err);
  }

  window.getSelection().removeAllRanges();
}

// Função para exibir o tooltip
function showTooltip() {
  const tooltip = document.getElementById("tooltip");
  tooltip.style.visibility = "visible";
  setTimeout(() => {
      tooltip.style.visibility = "hidden";
  }, 2000); // Oculta o tooltip após 2 segundos
}
