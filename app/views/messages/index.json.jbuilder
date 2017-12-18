json.array! @messages do |message|
  json.name    message.user.name
  json.body    message.body
  json.image   message.image
  json.time    message.published_on
end
