import { mongooseConnect } from "@/lib/mongoose";
import { Address } from "@/models/Address";
import { User } from "@/models/User";

export async function POST(req) {
  try {
    await mongooseConnect();
    const { fullname, phone, address, city, state, country, pincode, email } =
      await req.json();
    let user = await User.findOne({ email });
    if (user) {
      const userId = user._id.toString();
      await Address.create({
        fullname,
        phone,
        address,
        city,
        state,
        pincode,
        country,
        user: userId,
      });
      return Response.json({
        message: "Address created successfully",
        status: 200,
      });
    } else {
      return Response.json({
        message: "Unauthorized access",
        status: 500,
      });
    }
  } catch (error) {
    return Response.json({
      message: "Something went wrong,Please try again later",
      status: 500,
    });
  }
}

export async function GET(req) {
  try {
    await mongooseConnect();
    let email = req.headers.get("email");
    let user = await User.findOne({ email });
    if (user) {
      const userId = user._id.toString();
      let address = await Address.find({ user: userId });
      return Response.json({
        address,
        message: "Success",
        status: 200,
      });
    } else {
      return Response.json({
        message: "Unauthorized access",
        status: 500,
      });
    }
  } catch (error) {
    return Response.json({
      message: "Something went wrong,Please try again later",
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    await mongooseConnect();
    let email = req.headers.get("email");
    let id = req.headers.get("id");
    let user = await User.findOne({ email });
    if (user) {
      await Address.findByIdAndDelete(id);
      return Response.json({
        message: "Address deleted",
        status: 200,
      });
    } else {
      return Response.json({
        message: "Unauthorized access",
        status: 500,
      });
    }
  } catch (error) {
    return Response.json({
      message: "Something went wrong,Please try again later",
      status: 500,
    });
  }
}
