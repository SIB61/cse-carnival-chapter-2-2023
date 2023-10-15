export default function DoctorInfo({ consultant }) {
  return (
    <div className="flex flex-col gap-5 max-w-xl">
      <div className="flex gap-[30px] items-center">
        <div>
          {consultant.image ? (
            <img
              className="w-[150px] h-[160px] rounded-md overflow-hidden"
              src={consultant.image}
            />
          ) : (
            <img
              className="w-[180px] h-[186px] rounded-md overflow-hidden"
              src="https://static.vecteezy.com/system/resources/previews/005/520/145/original/cartoon-drawing-of-a-doctor-vector.jpg"
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-bold text-xl">{consultant?.name}</div>
          <div className="font-semibold text-lg">
            {consultant.consultantData.category}
          </div>
        </div>
      </div>
      <div className="flex gap-16">
        <div className="flex flex-col">
          <div className="font-semibold">License Number</div>
          <div>{consultant.consultantData.registrationNumber}</div>
        </div>
        <div className="flex flex-col">
          <div className="font-semibold">Degree</div>
          <div>M.B.B.S</div>
        </div>
        <div className="flex flex-col">
          <div className="font-semibold">Country</div>
          <div>Bangladesh</div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="font-semibold">Bio</div>
        <div>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
        </div>
      </div>
    </div>
  );
}
