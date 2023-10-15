const UserProfile = () => {
  const [firstName, lastName] = ["Gabriel", "Pedroza"];
  const profilePicture = "https://avatars.githubusercontent.com/u/59853942?v=4";
  const [age, location, income] = [25, "Mexico", 100000];

  return (
    <div className="flex h-[38%] w-[42%] justify-center rounded-lg border-2 border-gray-200 bg-white p-6">
      <div className="flex items-center gap-10 space-x-4">
        <div>
          <h2 className="mb-6 text-3xl font-bold">
            {firstName} {lastName}
          </h2>
          <div className="text-left text-xl">
            <p className="text-gray-600">Age: {age}</p>
            <p className="text-gray-600">Location: {location}</p>
            <p className="text-gray-600">Income: ${income.toLocaleString()}</p>
          </div>
        </div>
        <img
          src={profilePicture}
          alt={`${firstName} ${lastName}`}
          className="mx-auto h-[55%] w-[55%] rounded-md"
        />
      </div>
    </div>
  );
};

export default UserProfile;
