const UserProfile = () => {
  const [firstName, lastName] = ["Gabriel", "Pedroza"];
  const profilePicture = "https://avatars.githubusercontent.com/u/59853942?v=4";
  const [age, location, income] = [25, "Mexico", 100000];

  return (
    <div className="h-[42%] w-[42%] justify-center rounded-lg bg-white p-6 shadow-md">
      <div className="flex items-center space-x-4">
        <div className="flex flex-col justify-between">
          <h2 className="mb-6 text-3xl font-bold">
            {firstName} {lastName}
          </h2>
          <img
            src={profilePicture}
            alt={`${firstName} ${lastName}`}
            className="absolute mx-auto h-[40%] w-[40%] rounded-full"
          />
          <div className="text-xl">
            <p className="text-gray-600">Age: {age}</p>
            <p className="text-gray-600">Location: {location}</p>
            <p className="text-gray-600">Income: ${income.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
