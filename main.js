const getTicketId = (url) => {
  if (url.includes('selectedIssue=')) {
    return url.split('selectedIssue=')[1]
  }
  return url.split('/').pop()
}

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: '🦥 Branch Name',
    id: 'branch-name',
    contexts: ['all'],
    documentUrlPatterns: ['https://sainsburys-tech.atlassian.net/*']
  })
})

chrome.contextMenus.onClicked.addListener(({ menuItemId }) => {
  if (menuItemId === 'branch-name') {
    chrome.tabs.query({ active: true, currentWindow: true }, async function (tab) {
      await chrome.tabs.sendMessage(tab[0].id, { action: 'createBranchName', id: getTicketId(tab[0].url) })
    })
  }
})
