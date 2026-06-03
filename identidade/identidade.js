// ============================================================================
// MÓDULO DE IDENTIDADE DO USUÁRIO
// ----------------------------------------------------------------------------
// Responsável por descobrir QUEM está acessando na primeira vez e manter esse
// nome disponível para o resto da página, que o registra nos logs/anotações
// (campo `updated_by`, ao lado de status / comentário).
//
// O estado e as funções são expostos em `window.*` de propósito: o
// `index.html` carrega este arquivo ANTES do script principal, então as
// referências a `ME` / `showNameModal` / `changeName` lá resolvem para estes
// globais automaticamente. Mantém o estado compartilhado explícito entre os
// dois arquivos.
//
// Depende dos elementos do DOM (definidos no index.html):
//   #name-modal  #name-input  #me-name
// ============================================================================

// Nome do usuário atual. Persistido neste navegador.
window.ME = localStorage.getItem('hunit-piloto-me') || '';

// Abre o modal de identificação, pré-preenchendo com o nome atual (se houver).
window.showNameModal = function showNameModal() {
  document.getElementById('name-input').value = window.ME || '';
  document.getElementById('name-modal').style.display = 'flex';
  setTimeout(() => document.getElementById('name-input').focus(), 50);
};

// Salva o nome digitado, persiste no localStorage e fecha o modal.
window.saveName = function saveName() {
  const v = (document.getElementById('name-input').value || '').trim();
  if (!v) { alert('Digite um nome.'); return; }
  window.ME = v;
  localStorage.setItem('hunit-piloto-me', window.ME);
  document.getElementById('me-name').textContent = window.ME;
  document.getElementById('name-modal').style.display = 'none';
};

// Reabrir o modal para trocar de nome (usado pela badge no topo).
window.changeName = window.showNameModal;
