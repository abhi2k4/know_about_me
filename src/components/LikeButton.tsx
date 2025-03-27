import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const getLikeText = (count: number, hasLiked: boolean) => {
  if (hasLiked) return "Thanks for the love!";
  if (count === 0) return "Be the first to like!";
  if (count === 1) return "1 awesome person liked this";
  return `${count} awesome people liked this`;
};

export const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    fetchLikes();
    checkIfLiked();

    // Create channel with specific filter
    const channel = supabase
      .channel('likes-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'likes',
          filter: 'id=eq.1'
        },
        (payload) => {
          console.log('Realtime update:', payload);
          if (payload.new) {
            setLikes(payload.new.count);
          }
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
      });

    // Cleanup subscription
    return () => {
      channel.unsubscribe();
    };
  }, []);

  const fetchLikes = async () => {
    const { data, error } = await supabase
      .from('likes')
      .select('count')
      .eq('id', 1)
      .single();

    if (error) {
      console.error('Error fetching likes:', error);
      return;
    }

    setLikes(data.count);
  };

  const checkIfLiked = async () => {
    try {
      // Get IP
      const response = await fetch('https://api.ipify.org?format=json');
      const { ip } = await response.json();
      
      // Check both IP in database and local storage
      const { data } = await supabase
        .from('likes')
        .select('ip_addresses')
        .eq('id', 1)
        .single();
      
      setHasLiked(data?.ip_addresses?.includes(ip) || false);
    } catch (error) {
      console.error('Error checking like status:', error);
    }
  };

  const handleLike = async () => {
    if (hasLiked) return;
    setIsLoading(true);
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const { ip } = await response.json();
      
      const { data, error } = await supabase
        .rpc('increment_likes', { user_ip: ip });

      if (error) throw error;
      
      if (data) {
        setHasLiked(true);
        // Immediately update local state
        const newCount = likes + 1;
        setLikes(newCount);
        toast.success('Thanks for the love! ❤️');
      } else {
        toast.error('You\'ve already liked this!');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 font-inter">
      <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "relative flex items-center gap-1 px-3 py-2 rounded-full overflow-hidden",
          "transition-all duration-300 ease-in-out",
          "hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900",
          "active:scale-95",
          hasLiked && "text-red-600",
          isLoading && "cursor-not-allowed opacity-70"
        )}
        onClick={handleLike}
        disabled={isLoading || hasLiked}
      >
        {/* Background effect for shared area */}
        <span 
          className={cn(
            "absolute inset-0 rounded- transition-all duration-300",
            "bg-red-50/50 dark:bg-red-950/50",
            isLoading ? "translate-y-0" : "translate-y-full"
          )}
        />

        {/* Heart Icon */}
        <Heart 
          className={cn(
            "w-6 h-6 transition-all duration-300 ease-in-out",
            "hover:scale-125",
            hasLiked 
              ? "fill-red-600 scale-125 drop-shadow-[0_0_8px_rgba(255,82,82,0.6)]"
              : "fill-transparent stroke-current"
          )}
        />

        {/* Pulse animation when liked */}
        {hasLiked && (
          <span 
            className="absolute inset-0 bg-red-500/10 dark:bg-red-900/10 animate-ping rounded-full"
          />
        )}
      </Button>
      {hasLiked && (
        <span 
          className={cn(
            "text-sm font-semibold transition-all duration-300",
            "text-red-500 animate-fade-in"
          )}
        >
          {likes}
        </span>
      )}

        
      </div>
      <p 
        className={cn(
          "text-sm text-muted-foreground transition-all duration-300",
          hasLiked && "text-red-500"
        )}
      >
       <b> {getLikeText(likes, hasLiked)} </b>
      </p>
    </div>
  );
};