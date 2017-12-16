json.array! @messages do |message|
  json.name    message.user.name
  json.body    message.body
  json.image   message.image
  json.time    published_on(message)
end
