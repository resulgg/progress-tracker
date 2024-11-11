type SubscriptionItem = {
  id: number;
  price_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  is_usage_based: boolean;
  subscription_id: number;
};

type RelationshipLinks = {
  self: string;
  related: string;
};

type Relationship = {
  links: RelationshipLinks;
};

export type LemonSqueezyPayload = {
  data: {
    id: string;
    type: string;
    links: {
      self: string;
    };
    attributes: {
      urls: {
        customer_portal: string;
        update_payment_method: string;
        customer_portal_update_subscription: string;
      };
      pause: null;
      status: string;
      ends_at: null;
      order_id: number;
      store_id: number;
      cancelled: boolean;
      renews_at: string;
      test_mode: boolean;
      user_name: string;
      card_brand: string;
      created_at: string;
      product_id: number;
      updated_at: string;
      user_email: string;
      variant_id: number;
      customer_id: number;
      product_name: string;
      variant_name: string;
      order_item_id: number;
      trial_ends_at: null;
      billing_anchor: number;
      card_last_four: string;
      status_formatted: string;
      first_subscription_item: SubscriptionItem;
    };
    relationships: {
      order: Relationship;
      store: Relationship;
      product: Relationship;
      variant: Relationship;
      customer: Relationship;
      "order-item": Relationship;
      "subscription-items": Relationship;
      "subscription-invoices": Relationship;
    };
  };
  meta: {
    test_mode: boolean;
    event_name: string;
    webhook_id: string;
    custom_data: {
      user_id: string;
    };
  };
};
