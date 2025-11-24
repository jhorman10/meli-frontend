import React from 'react';
import { UI_STRINGS } from '@/shared/constants';

interface ProductDescriptionProps {
  description?: {
    plainText: string;
  };
  attributes?: {
    id: string;
    name: string;
    valueName: string;
  }[];
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({
  description,
  attributes,
}) => {
  if (!description?.plainText) return null;

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">
        {UI_STRINGS.PRODUCT_DETAIL.DESCRIPTION.TITLE}
      </h2>
      <p className="text-gray-700 mb-4 whitespace-pre-line">
        {description.plainText}
      </p>
      {attributes && attributes.length > 0 && (
        <div className="border-t border-gray-200 mt-4 pt-4">
          <h3 className="font-medium mb-2">
            {UI_STRINGS.PRODUCT_DETAIL.DESCRIPTION.FEATURES}
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {attributes.slice(0, 6).map((attr) => (
              <li key={attr.id}>
                <span className="font-medium">{attr.name}:</span>{' '}
                {attr.valueName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
