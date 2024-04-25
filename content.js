const getBranchName = (id, title) => {
  return `${id}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)

chrome.runtime.onMessage.addListener(function ({ action, id }) {
  if (action === 'createBranchName') {
    const headings = document.getElementsByTagName('h1')
    const title = headings[headings.length - 1].textContent
    const createBranch = 'git checkout -b ' + getBranchName(id, title)

    navigator.clipboard.writeText(createBranch)
    alert('Branch name copied to clipboard!\n\n' + createBranch)
  }

  if (action === 'createPRName') {
    const branch = document.getElementById('head-ref-selector').querySelector('[data-menu-button]').textContent
    const [project, id, ...name] = branch.split('-')
    const title = `${project}-${id}: ${capitalizeFirstLetter(name.join(' '))}`

    document.getElementById('pull_request_title').value = title
  }
})
