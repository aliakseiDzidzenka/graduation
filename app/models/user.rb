class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one :crystal
  has_and_belongs_to_many :planes
  has_one :record
  after_create :add_crystals
  after_create :add_plane
  after_create :add_records

  # validates :email, uniqueness: true
  # validates :email, presence: true


  # validates_associated :crystal

  def add_crystals
  	self.crystal = Crystal.new
  end

  def add_plane
    self.planes << Plane.first
  end

  def add_records
    self.record = Record.new
  end

end
