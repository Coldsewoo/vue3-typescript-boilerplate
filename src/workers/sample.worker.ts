import '/Utils/prototypes/Object'

self.onmessage = function (event) {
  const message = event.data.message
  self.postMessage(message)
}

export {}
