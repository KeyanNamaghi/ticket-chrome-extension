const getBranchName = (id, title) => {
  return `${id}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}

chrome.runtime.onMessage.addListener(function ({ action, id }) {
  if (action === 'createBranchName') {
    const headings = document.getElementsByTagName('h1')
    const title = headings[headings.length - 1].textContent
    const createBranch = 'git checkout -b ' + getBranchName(id, title)

    navigator.clipboard.writeText(createBranch)
    alert('Branch name copied to clipboard!\n\n' + createBranch)
  }
})
