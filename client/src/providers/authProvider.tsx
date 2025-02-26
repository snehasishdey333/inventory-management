"use client";
import React, { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator, Heading, useAuthenticator, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
      
    },
    
  }
});



const formFields = {
  signIn: {
    username: {
      placeholder: "Enter your email",
      label: "Email",
      isRequired: true,
    },
    password: {
      placeholder: "Enter your password",
      label: "Password",
      isRequired: true,
    },
  },
  signUp: {
    username: {
      label: 'Username:',
      placeholder: 'Enter your Username:',
      isRequired: true,
      order: 1,
    },
    email: {
      isRequired: true,
      order: 2,
      label: 'Enter your email',
      placeholder: 'Enter your email',
    },
    password: {
      label: 'Password:',
      placeholder: 'Enter your Password:',
      isRequired: true,
      order: 3,
    },
    // name: {
    //   label: 'Full Name:',
    //   placeholder: 'Enter your full name',
    //   isRequired: true,
    //   order: 4,
    // },
    
    
    // phone: {
    //   label: 'Phone Number:',
    //   placeholder: 'Enter your phone number',
    //   isRequired: true,
    //   order: 5,
    // },
    // address: {
    //   label: 'Address:',
    //   placeholder: 'Enter your address',
    //   isRequired: true,
    //   order: 6,
    // },
  }
}

const components = {
  
  SignIn: {
    Header() {
      return (
        <View className="mt-4 mb-7">
          <Heading level={3} className="!text-2xl !font-bold">
            Inventory
            <span className="text-secondary-500 font-light hover:!text-primary-300">
              Manager
            </span>
          </Heading>
          <p className="text-muted-foreground mt-2">
            <span className="font-bold">Welcome!</span> Please sign in to continue
          </p>
        </View>
      );
    },
    Footer() {
      // const { toSignUp } = useAuthenticator();
      return (
        <View className="text-center mt-4">
          <p className="text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup"
              className=""
            >
              Sign up here
            </Link>
          </p>
        </View>
      );
    },
  },
  SignUp: {
    Header() {
      return (
        <View className="mt-4 mb-7">
          <Heading level={3} className="!text-2xl !font-bold ">
            Inventory
            <span className="text-secondary-500 font-light hover:!text-primary-300 ">
              Manager
            </span>
          </Heading>
          <p className="text-muted-foreground mt-2">
            <span className="font-bold">Welcome!</span> Please sign up to continue
          </p>
        </View>
      );
    },
    // FormFields() {
    //   const { validationErrors } = useAuthenticator();

    //   return (
    //     <>
    //       <Authenticator.SignUp.FormFields />
          
    //       {/* Additional fields for Name, Phone, and Address */}
    //       <div className="mt-4">
    //         <Text className="block font-medium">Full Name</Text>
    //         <Input
    //           type="text"
    //           name="custom:name"
    //           placeholder="Enter your full name"
    //           className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
    //           required
    //         />
    //         {validationErrors?.["name"] && (
    //           <Text className="text-red-500 text-sm mt-1">{validationErrors["name"]}</Text>
    //         )}
    //       </div>
    //       <div className="mt-4">
    //         <Text className="block font-medium">Phone Number</Text>
    //         <Input
    //           type="text"
    //           name="custom:phone"
    //           placeholder="Enter your phone number"
    //           className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
    //           required
    //         />
    //         {validationErrors?.["phone"] && (
    //           <Text className="text-red-500 text-sm mt-1">{validationErrors["phone"]}</Text>
    //         )}
    //       </div>
    //       <div className="mt-4">
    //         <Text className="block font-medium">Address</Text>
    //         <Input
    //           type="text"
    //           name="custom:address"
    //           placeholder="Enter your address"
    //           className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
    //           required
    //         />
    //         {validationErrors?.["address"] && (
    //           <Text className="text-red-500 text-sm mt-1">{validationErrors["address"]}</Text>
    //         )}
    //       </div>

    //       <RadioGroupField
    //         legend="Sex"
    //         name="custom:sex"
    //         errorMessage={validationErrors?.["custom:sex"]}
    //         hasError={!!validationErrors?.["custom:sex"]}
    //         isRequired
    //       >
    //         <div className='flex items-center space-x-2'>
    //         <Radio value="Male">Male</Radio>
    //         <Radio value="Female">Female</Radio>
    //         <Radio value="Others">Others</Radio>
    //         </div>
            
    //       </RadioGroupField>
    //     </>
    //   );
    // },

    Footer() {
      // const { toSignIn } = useAuthenticator();
      return (
        <View className="text-center mt-4">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link
            href="/signin"
              // onClick={toSignIn}
              className="text-primary hover:underline bg-transparent border-none p-0"
            >
              Sign in
            </Link>
          </p>
        </View>
      );
    },
  },
};


const Auth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  
  // console.log(user)
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname.match(/^\/(signin|signup)$/);
  const isDashboardPage =
    pathname.startsWith("/dashboard") || pathname.startsWith("/categories") || pathname.startsWith("/expenses") || pathname.startsWith("/incomes") || pathname.startsWith("/inventory") || pathname.startsWith("/products") || pathname.startsWith("/settings") || pathname.startsWith("/staffs")

  // Redirect authenticated users away from auth pages
  useEffect(() => {
    if (user && isAuthPage) {
      router.push("/dashboard");
    }
  }, [user, isAuthPage, router]);

  // Allow access to public pages without authentication
  if (!isAuthPage && !isDashboardPage) {
    return <>{children}</>;
  }

  return (
    <div className="h-full">
      <Authenticator 
        initialState={pathname.includes("signup") ? "signUp" : "signIn"}
        components={components} 
        formFields={formFields}
      >
        {() => <div>{children}</div>}
      </Authenticator>
    </div>
  );
};

export default Auth;
