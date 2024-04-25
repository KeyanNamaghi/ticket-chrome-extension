const BRANCH_ID = 'BRANCH_ID'
const PR_ID = 'PR_ID'

const getTicketId = (url) => {
  if (url.includes('selectedIssue=')) {
    return url.split('selectedIssue=')[1]
  }
  return url.split('/').pop()
}

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: '🦥 Branch Name',
    id: BRANCH_ID,
    contexts: ['all'],
    documentUrlPatterns: ['https://sainsburys-tech.atlassian.net/*']
  })
})

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: '🦥 PR Name',
    id: PR_ID,
    contexts: ['all'],
    documentUrlPatterns: ['https://github.com/*']
  })
})

chrome.contextMenus.onClicked.addListener(({ menuItemId }) => {
  if (menuItemId === BRANCH_ID) {
    chrome.tabs.query({ active: true, currentWindow: true }, async function (tab) {
      await chrome.tabs.sendMessage(tab[0].id, { action: 'createBranchName', id: getTicketId(tab[0].url) })
    })
  }

  if (menuItemId === PR_ID) {
    chrome.tabs.query({ active: true, currentWindow: true }, async function (tab) {
      await chrome.tabs.sendMessage(tab[0].id, { action: 'createPRName' })
    })
  }
})
