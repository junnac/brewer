# == Schema Information
#
# Table name: breweries
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  lat        :float            not null
#  lng        :float            not null
#  address    :string           not null
#  website    :string           not null
#  city_id    :integer          not null
#  guide_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Brewery < ApplicationRecord
  validates :name, :lat, :lng, :address, :website, :city_id, :guide_id, presence: true
  validates :name, uniqueness: true

  belongs_to :city
  belongs_to :guide
end
