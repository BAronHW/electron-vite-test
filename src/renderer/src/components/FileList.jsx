import React, { useState, useEffect } from 'react'

function FileList() {
  const [files, setFiles] = useState([])

  useEffect(() => {
    console.log('window.api:', window.api)
    console.log('window.electron:', window.electron)

    async function loadFiles() {
      try {
        if (window.api && window.api.getDirectoryContents) {
          const contents = await window.api.getDirectoryContents()
          setFiles(contents)
        } else if (window.electron && window.electron.ipcRenderer) {
          const contents = await window.electron.ipcRenderer.invoke('get-directory-contents')
          setFiles(contents)
        } else {
          console.error('Neither window.api.getDirectoryContents nor window.electron.ipcRenderer.invoke is available')
        }
      } catch (error) {
        console.error('Failed to load directory contents:', error)
      }
    }
    loadFiles()
  }, [])

  return (
    <div>
      <h2>Files in Current Directory:</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            {file.name} {file.isDirectory ? '(Directory)' : '(File)'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FileList