import { Mail, Phone, User } from 'lucide-react';
import React from 'react'


const AdminContactCard = () => {
  return (
    <div className="fixed bottom-8 right-8 z-10">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-72 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <h3 className="text-white font-semibold text-lg">
            Store Administrator
          </h3>
          <p className="text-blue-100 text-sm">Contact for Support</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Williams agborman
              </p>
              <p className="text-xs text-gray-500">Store Manager</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <Phone className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                +237 672808485
              </p>
              <p className="text-xs text-gray-500">Available on WhatsApp</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <Mail className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 break-all">
                williamsagborman@gmail.com
              </p>
              <p className="text-xs text-gray-500">Email support</p>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <a
              href="tel:+237672808485"
              className="flex-1 bg-blue-100 text-blue-700 hover:bg-blue-200 text-sm font-medium px-4 py-2 rounded-md text-center transition-colors"
            >
              Call
            </a>
            <a
              href="https://wa.me/237672808485"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-100 text-green-700 hover:bg-green-200 text-sm font-medium px-4 py-2 rounded-md text-center transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContactCard