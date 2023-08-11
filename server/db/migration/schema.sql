-- Drop and recreate Users table

DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS messages_room CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS pets CASCADE;
DROP TABLE IF EXISTS sitters CASCADE;
DROP TABLE IF EXISTS owners CASCADE;


CREATE TABLE owners (
	id SERIAL PRIMARY KEY NOT NULL, 
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	email VARCHAR(50) NOT NULL,
  sub_id VARCHAR(250),
  photo_url VARCHAR(250)
);

CREATE TABLE sitters (
	id SERIAL PRIMARY KEY NOT NULL,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
  photo_url VARCHAR(250),
	email VARCHAR(50) NOT NULL,
  sub_id VARCHAR(250) NOT NULL,
  accepted_pet_type TEXT[] CHECK('cat' = ANY (accepted_pet_type) OR 'dog' = ANY (accepted_pet_type)),
  availability_dates DATE[]
);

CREATE TABLE pets (
  id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(50) NOT NULL,
	type VARCHAR(50) CHECK(type IN ('cat', 'dog')),
	description VARCHAR(500) NOT NULL,
	image_url VARCHAR(250),
	owner_id INTEGER REFERENCES owners(id) ON DELETE CASCADE
);


CREATE TABLE bookings (
  id SERIAL PRIMARY KEY NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE CHECK (end_date > start_date) NOT NULL,
  status VARCHAR(50) CHECK(status IN ('pending', 'accepted', 'rejected', 'completed')) DEFAULT 'pending',
  pet_id INTEGER REFERENCES pets(id)  ON DELETE CASCADE NOT NULL,
  owner_id INTEGER REFERENCES owners(id) ON DELETE CASCADE NOT NULL,
  sitter_id INTEGER REFERENCES sitters(id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE messages_room (
  id SERIAL PRIMARY KEY NOT NULL,  
  booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  sender_owner_id INTEGER REFERENCES owners(id) ON DELETE CASCADE,
  sender_sitter_id INTEGER REFERENCES sitters(id) ON DELETE CASCADE,
  room_id INTEGER REFERENCES messages_room(id) ON DELETE CASCADE,
  message_content TEXT NOT NULL
);

CREATE TABLE reviews(
  id SERIAL PRIMARY KEY NOT NULL,
  sitter_review TEXT DEFAULT NULL,
  sitter_rating INTEGER CHECK(sitter_rating >=1 AND sitter_rating <=5) DEFAULT NULL,
  sitter_id INTEGER REFERENCES sitters(id) ON DELETE CASCADE,
  owner_id INTEGER REFERENCES owners(id) ON DELETE CASCADE
);

