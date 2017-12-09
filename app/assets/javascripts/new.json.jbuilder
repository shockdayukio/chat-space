json.array! @users do |user|
  json.user_id user.id
  json.name user.name
end
